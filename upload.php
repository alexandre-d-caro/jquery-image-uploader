<?php

	if(isset($_POST) && $_FILES['picture']) {
		
		$new_top = abs(intval($_POST["top"]));
		$new_left = abs(intval($_POST["left"]));

		$file_path = $_FILES['picture']['tmp_name'];
		$size = getimagesize($file_path);
		$base_width = $size[0];
		$base_height = $size[1];

		//Set the values of the final image
		$width = 292;
		$height = 220;

		//Set the uploaded image as a model
		$base_img = imagecreatefromjpeg($file_path);

		//Create a new image
		$dst_r = imagecreatetruecolor($width,$height);

		$copy = imagecopy($dst_r,$base_img,0,0,$new_left,$new_top,$width,$height);

		//Create the image with a unique name
		$name_file = substr(md5(uniqid()),0,6);
		$fin = imagejpeg($dst_r,"uploads/".$name_file.".jpg",90);

		move_uploaded_file($_FILES['picture']['tmp_name'], 'uploads/origin_'.$name_file.'.jpg');
		
		$final_name = "uploads/".$name_file.".jpg";

		echo $final_name;
	}