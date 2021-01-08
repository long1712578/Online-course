const express = require('express');
const modelTeacher = require('../Models/teacher.model');
const router = express.Router();

router.get('/teacher', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const rows = await modelTeacher.getTeacherAll(page);
    const pages = [];
    for (let i = 0; i < rows.pageTotal; i++) {
        pages[i] = { value: i + 1, active: (i + 1) === page };
    }
    const navs = {};
    if (page > 1) {
        navs.prev = page - 1;
    }
    if (page < rows.pageTotal) {
        navs.next = page + 1;
    }
    res.render('users/teacher', {
        teacher: rows.teacher,
        pages: pages,
        navs: navs
    });
}),
    router.get('/teacher/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const row = await modelTeacher.getTeacherById(id);
        const d = row[0].dob;

        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
        const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
        let curDate = `${ye}-${mo}-${da}`;
        res.render('users/teacherDetail', {
            teacherDetail: row,
            dob: curDate,
        });
    })
module.exports = router;