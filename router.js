const express = require('express');
const router = express.Router();

const conexion = require('./database/db');

router.get('/', (req, res)=>{

	conexion.query('SELECT * FROM users', (error, results) => {
	  if (error){
	  	throw error;
	  }else{
	  	res.render('index',{results:results});
	  }

	})
})

router.get('/create', (req, res)=> {
	res.render('create');
})

router.get('/edit/:id', (req, res)=> {

	const id = req.params.id;
	conexion.query('SELECT * FROM users WHERE id= ?',[id], (error, results) => {
		if (error){
  			throw error;
	  	}else{
	  		res.render('edit',{user:results[0]});
	  	}
	})
})

router.get('/delete/:id', (req, res) =>{
	const id = req.params.id;
	console.log('ID a eliminar:'+" "+id);
	conexion.query('DELETE FROM users WHERE id = ?', [id], (error, results) =>{
		if (error){
  			throw error;
	  	}else{
	  		const msj = "Se ha eliminado correctamente el Usuario";
	  		res.redirect('/');
	  		
	  	}
	})
})

router.get('/configuracion', (req, res) =>{
	res.render('configuracion');
})

const crud = require('./controllers/crud');
router.post('/save',crud.save);
router.post('/update', crud.update);

module.exports = router