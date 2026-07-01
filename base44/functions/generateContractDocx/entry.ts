import {
  Document, Packer, Paragraph, TextRun,
  Table, TableRow, TableCell, WidthType,
  AlignmentType, BorderStyle,
} from 'npm:docx@8.5.0';

Deno.serve(async (req) => {
  try {
    const { title, subtitle, blocks } = await req.json();

    const children = [];

    children.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: title || "Трудовой договор", bold: true, size: 32 })],
      spacing: { after: 200 },
    }));

    if (subtitle) {
      children.push(new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: subtitle, bold: true, size: 26 })],
        spacing: { after: 300 },
      }));
    }

    for (const block of blocks) {
      switch (block.type) {
        case 'heading':
          children.push(new Paragraph({
            children: [new TextRun({ text: block.text, bold: true, size: 24 })],
            spacing: { before: 300, after: 150 },
            border: { bottom: { color: '999999', space: 1, style: BorderStyle.SINGLE, size: 6 } },
          }));
          break;
        case 'subheading':
          children.push(new Paragraph({
            children: [new TextRun({ text: block.text, bold: true, size: 22 })],
            spacing: { before: 200, after: 100 },
          }));
          break;
        case 'paragraph':
          children.push(new Paragraph({
            children: [new TextRun({ text: block.text, size: 22 })],
            spacing: { after: 100 },
            alignment: AlignmentType.JUSTIFIED,
          }));
          break;
        case 'bullets':
          for (const item of block.items) {
            children.push(new Paragraph({
              bullet: { level: 0 },
              children: [new TextRun({ text: item, size: 22 })],
              spacing: { after: 50 },
            }));
          }
          break;
        case 'table': {
          const rows = [];
          if (block.headers) {
            rows.push(new TableRow({
              children: block.headers.map(h => new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 20 })] })],
                shading: { fill: 'E8E8E8' },
              })),
            }));
          }
          for (const row of (block.rows || [])) {
            const cells = Array.isArray(row) ? row : [row];
            rows.push(new TableRow({
              children: cells.map(cell => new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: String(cell), size: 20 })] })],
              })),
            }));
          }
          children.push(new Table({
            rows,
            width: { size: 100, type: WidthType.PERCENTAGE },
          }));
          children.push(new Paragraph({ spacing: { after: 150 }, children: [] }));
          break;
        }
      }
    }

    const doc = new Document({
      sections: [{ properties: {}, children }],
    });

    const blob = await Packer.toBlob(doc);
    const arrayBuffer = await blob.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    let binary = '';
    const chunk = 8192;
    for (let i = 0; i < bytes.length; i += chunk) {
      binary += String.fromCharCode.apply(null, bytes.subarray(i, Math.min(i + chunk, bytes.length)));
    }
    const base64 = btoa(binary);

    return Response.json({
      base64,
      filename: `${subtitle || title || 'contract'}.docx`,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});