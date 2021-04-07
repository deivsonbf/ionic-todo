const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req,res,next) => {
    
    mysql.getConnection((error , conn) => {
        if(error) { return res.status(500).send({ error: error}) }

        conn.query(
            'SELECT * FROM TASKS',
            (error , resultado , fields) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error}) }
                return res.status(200).send({
                    response: resultado
                })
            }
        )
    });    
});

router.get('/id/:id_task' , (req , res , next) => {

    mysql.getConnection((error , conn) => {
        if(error) { return res.status(500).send({ error: error}) }

        conn.query(
            'SELECT * FROM TASKS WHERE ID_TASK = ?' ,
            [req.params.id_task],
            (error , resultado , fields) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error}) }
                return res.status(200).send({
                    response: resultado
                })
            }
        )
    });

}); 

router.post('/' , (req , res , next)  => {
        
    mysql.getConnection((error , conn) => {
        
        if(error) { return res.status(500).send({ error: error}) }

        conn.query('INSERT INTO TASKS (TASK_NAME , TASK_DATE, TASK_DONE) values (? , ? , ?)',
        [req.body.task_name ,req.body.task_date ,req.body.task_done],
        (error , resultado , field) => {

            conn.release();

            if(error) { return res.status(500).send({ error: error}) }

            res.status(201).send({
                mensagem: "Inserido com sucesso",
                id_produto: resultado.insertId
            });
        }
        )
    });

});

router.patch('/' , (req , res , next)  => {

    mysql.getConnection((error , conn) => {
        
        if(error) { return res.status(500).send({ error: error}) }

        conn.query('UPDATE TASKS SET TASK_NAME = ?, TASK_DATE = ? , TASK_DONE = ?  WHERE ID_TASK = ?',
        [
            req.body.task_name ,
            req.body.task_date, 
            req.body.task_done, 
            req.body.id_task
        ],
        (error , resultado , field) => {
            conn.release();
            if(error) { return res.status(500).send({ error: error}) }
            res.status(202).send({
                mensagem: "alterado com sucesso",
            });
        }
        )
    });

});

// exclui um produto
router.delete('/' , (req , res , next)  => {
    mysql.getConnection((error , conn) => {
        
        if(error) { return res.status(500).send({ error: error}) }

        conn.query('DELETE FROM TASKS WHERE ID_TASK = ?',
        [req.body.id_task],
        (error , resultado , field) => {
            conn.release();
            if(error) { return res.status(500).send({ error: error}) }
            res.status(202).send({
                mensagem: "deletado com sucesso", 
            });
        }
        )
    });
});

module.exports = router;


