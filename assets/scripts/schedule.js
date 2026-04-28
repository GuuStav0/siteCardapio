/**
 * schedule.js
 * Lê o schedule.json e calcula se o café está aberto agora.
 * Para mudar os horários, edite apenas o schedule.json — sem tocar no código.
 */

/**
 * Busca e interpreta o schedule.json.
 * @returns {Promise<{ isOpen: boolean, label: string, todayHours: string }>}
 */
export async function getScheduleStatus() {
  let schedule;

  try {
    const res = await fetch("./schedule.json");
    schedule = await res.json();
  } catch {
    // Se o JSON não carregar, retorna estado neutro
    return { isOpen: null, label: "Horário indisponível", todayHours: "" };
  }

  const now = new Date();

  // Verifica feriados primeiro
  const todayDate = now.toISOString().slice(0, 10); // "YYYY-MM-DD"
  const holiday = schedule.holidays?.find((h) => h.date === todayDate);
  if (holiday) {
    return { isOpen: false, label: holiday.label, todayHours: "" };
  }

  const dayOfWeek = now.getDay(); // 0 = domingo, 6 = sábado
  const dayConfig = schedule.hours[dayOfWeek];

  // Dia fechado
  if (!dayConfig || !dayConfig.open) {
    return {
      isOpen: false,
      label: `Fechado às ${dayConfig?.label ?? "hoje"}`,
      todayHours: "",
    };
  }

  // Compara horário atual com abertura/fechamento
  const [startH, startM] = dayConfig.start.split(":").map(Number);
  const [endH, endM]     = dayConfig.end.split(":").map(Number);

  const totalMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes  = startH * 60 + startM;
  const closeMinutes = endH * 60 + endM;

  const isOpen = totalMinutes >= openMinutes && totalMinutes < closeMinutes;

  // Quantos minutos faltam para fechar / abrir
  let label;
  if (isOpen) {
    const remaining = closeMinutes - totalMinutes;
    if (remaining <= 30) {
      label = `Fecha em ${remaining} min`;
    } else {
      label = `Aberto até ${dayConfig.end}`;
    }
  } else {
    label =
      totalMinutes < openMinutes
        ? `Abre hoje às ${dayConfig.start}`
        : `Fechado — abre ${getNextOpenLabel(schedule, now)}`;
  }

  return {
    isOpen,
    label,
    todayHours: `${dayConfig.start} – ${dayConfig.end}`,
  };
}

/**
 * Retorna o label do próximo dia de abertura.
 * @param {object} schedule
 * @param {Date}   now
 * @returns {string}
 */
function getNextOpenLabel(schedule, now) {
  for (let i = 1; i <= 7; i++) {
    const nextDay = (now.getDay() + i) % 7;
    const config  = schedule.hours[nextDay];
    if (config?.open) {
      return i === 1
        ? `amanhã às ${config.start}`
        : `${config.label} às ${config.start}`;
    }
  }
  return "em breve";
}
