<?php
	
	$return = array(

		'tasklist'	=>	array(

				array(
						'id' => 0,
						'name' => 'Etapa 1',
						'description' => 'Bla bla bla bla',

						'tasks' => array(

								array(
										'id' => 0,
										'name' => 'Complatar el form',
										'description' => 'Esta en esta URl: http://www.w.w.w.com'

									),

								array(
										'id' => 1,
										'name' => 'Imprimir el form',
										'description' => ''

									),

								array(
										'id' => 2,
										'name' => 'Lamar a chio',
										'description' => 'Para salir'

									),



							)

					),

				array(
						'id' => 1,
						'name' => 'Etapa 2',
						'description' => 'Comunicacion',

						'tasks' => array(

								array(
										'id' => 4,
										'name' => 'Activar la nueva opcion',
										'description' => 'descagar la smi la po'

									),

								array(
										'id' => 5,
										'name' => 'Esto se aplica a.. ',
										'description' => ''

									)

							)

					),

				array(
						'id' => 2,
						'name' => 'Etapa 3',
						'description' => 'Comunicacion',

						'tasks' => array(

								array(
										'id' => 7,
										'name' => 'Activar la nueva opcion',
										'description' => 'descagar la smi la po'

									),

								array(
										'id' => 8,
										'name' => 'Esto se aplica a.. ',
										'description' => ''

									)

							)

					),

				array(
						'id' => 3,
						'name' => 'Etapa 4',
						'description' => 'Comunicacion',

						'tasks' => array(

								array(
										'id' => 9,
										'name' => 'Activar la nueva opcion',
										'description' => 'descagar la smi la po'

									),

								array(
										'id' => 10,
										'name' => 'Esto se aplica a.. ',
										'description' => ''

									)

							)

					),

			),

	);

	function gettask($id){

		global $return;

		foreach ($return['tasklist'] as $key => $value) {

			foreach ($value['tasks'] as $i => $v) {

				if($v['id'] == $id) return $v;
				# code...
			}
			# code...
		}
	}

	if(isset($_GET['tasklist'])){

		$return = $return['tasklist'][$_GET['tasklist']];

	}elseif(isset($_GET['task'])){

		$return = gettask($_GET['task']);

		//$return = array();
	}else{

	}

	$json = json_encode($return);
	echo $json;
	//print_r($return);
?>