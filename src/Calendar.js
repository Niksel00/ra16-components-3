import moment from 'moment';

function Calendar({ date }) {
  moment.locale('ru', {
    weekdays : 'Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота'.split('_'),
    months : 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split('_'),
    monthsShort : 'Января_Февраля_Марта_Апреля_Мая_Июня_Июля_Августа_Сентября_Октября_Ноября_Декабря'.split('_'),
  });

  // начинаем всегда с понедельника
  let startDate = moment(date).startOf('month');
  if (startDate.day() !== 1) {
    startDate = startDate.subtract((1 - startDate.day()) * -1, 'days');
  }
  // заканчиваем воскресеньем
  let endDate = moment(date).endOf('month');
  if (endDate.day() !== 0) {
    endDate = endDate.add(7 - endDate.day(), 'days');
  }
  // считаем количество дней между датами
  const daysCount = endDate.diff(startDate, 'days');

  // заполняем массив датами в Unix-timestamp
  const datesArray = [+startDate.format('x')];
  for (let i = 0; i < daysCount; i += 1) {
    datesArray.push(+startDate.add(1, 'days').format('x'));
  }

  // разбиваем массив дат на подмассивы по 7 дней
  const weeksArray = [];
  for (let i = 0; i < datesArray.length; i += 7) {
    weeksArray.push(datesArray.slice(i, i + 7));
  }

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{moment(date).format('dddd')}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{moment(date).format('D')}</div>
          <div className="ui-datepicker-material-month">{moment(date).format('MMM')}</div>
          <div className="ui-datepicker-material-year">{moment(date).format('YYYY')}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{moment(date).format('MMMM')}</span>&nbsp;<span className="ui-datepicker-year">{moment(date).format('YYYY')}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Понедельник">Пн</th>
            <th scope="col" title="Вторник">Вт</th>
            <th scope="col" title="Среда">Ср</th>
            <th scope="col" title="Четверг">Чт</th>
            <th scope="col" title="Пятница">Пт</th>
            <th scope="col" title="Суббота">Сб</th>
            <th scope="col" title="Воскресенье">Вс</th>
          </tr>
        </thead>
        <tbody>
            {weeksArray.map((weeks) => {
              return (
                <tr key={moment(weeks[0]).week()}>
                  {weeks.map((day) => {
                    return (
                      <td className={moment(date).month() !== moment(day).month() ? "ui-datepicker-other-month" : null} key={day}>
                        {moment(day).format('D')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;