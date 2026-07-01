import { createClientFromRequest } from 'npm:@base44/sdk@0.8.35';

const ADMIN_EMAIL = 'investkorspb@gmail.com';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    // Entity automation payload: { event, data, old_data }
    const data = body.data || body;

    const fullName = data.full_name || 'Не указано';
    const phone = data.phone || 'Не указан';
    const email = data.email || 'Не указан';
    const vacancy = data.vacancy || 'Не указана';
    const experience = data.experience || 'Не указан';
    const comment = data.comment || '—';
    const type = data.type === 'callback' ? 'Обратный звонок' : 'Заявка на трудоустройство';

    const subject = `📬 ${type}: ${fullName}`;
    const bodyText = [
      `Получена новая заявка с сайта восстановления.`,
      '',
      `Тип: ${type}`,
      `ФИО: ${fullName}`,
      `Телефон: ${phone}`,
      `E-mail: ${email}`,
      `Вакансия: ${vacancy}`,
      `Опыт работы: ${experience}`,
      `Комментарий: ${comment}`,
      '',
      `Согласие на обработку данных: ${data.consent ? 'Да' : 'Нет'}`,
      '',
      `---`,
      `Время: ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Vladivostok' })}`,
    ].join('\n');

    await base44.integrations.Core.SendEmail({
      to: ADMIN_EMAIL,
      subject,
      body: bodyText,
      from_name: 'Портал восстановления',
    });

    return Response.json({ success: true, message: `Письмо отправлено на ${ADMIN_EMAIL}` });
  } catch (error) {
    console.error('sendApplicationEmail error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});