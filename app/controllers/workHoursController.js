const workHoursModel = require('../models/workHoursModel')

/** almacena el reporte en DB**/
const toStock = async (req, res, next) => {
    const tecnico = req.body.tecnico
    const service = req.body.service
    const date = req.body.date
    const timeStart = req.body.timeStart
    const timeEnd = req.body.timeEnd
    const completed = req.body.completed

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let query = {
        tecnico,
        service,
        date
    }

    let d = new Date(date);
    const dayWeek = dayNames[d.getDay() + 1];
    d.setHours(0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const weekYear = Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7)

    const objDay = {}
    objDay[dayWeek] = completed
    objDay.timeStart = timeStart,
    objDay.timeEnd = timeEnd
    query.weekYear = weekYear
    query.week = objDay

    const data = {
        tecnico: tecnico,
        weekYear: weekYear
    };
  

    await workHoursModel.find(data)
        .then(async (report) => {
            if (report.length === 0) {
                const workHours = new workHoursModel(query)
                await workHours.save(err => {
                    if (err) return res.status(500).send(err);
                    return res.json({ stored: true });
                });
            }
            if (report.length > 0) {
                const arrDays = report.map(repor => repor.week).shift()
                const arrNameDay = arrDays.map(days => Object.keys(days).shift())
                if (arrNameDay.includes(dayWeek)) {
                    res.json({
                        message: 'Ya ha hecho el reporte de esta fecha'
                    });
                    return;
                } else {
                    arrDays.push(objDay)
                    await workHoursModel.findByIdAndUpdate(report.shift()._id, {
                        week: arrDays
                    });
                    return res.json({ stored: true });
                }
            }
        }).catch(error => console.log(error));
}

module.exports = {
    toStock
}