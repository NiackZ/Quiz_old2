import React, { useState } from 'react';
import { Col, Container, Form, Image, Button, Row } from 'react-bootstrap';
import myimg from "../img/84355595_p0.jpg"
import Input from '../components/Input/Input';
// import ImgCrop from 'antd-img-crop';
// import { message, Upload } from 'antd';
// import 'antd/dist/antd.css';

const Profile = () => {

	const [fileList, setFileList] = useState([]);

	const onChange = ({ fileList: newFileList }) => {
		console.log(fileList);
		setFileList(newFileList);
	};

	const onPreview = async (file) => {
		console.log(file);
	}

	const onRemove = async (file) => {
		console.log(file);
	}

	const props = {
		name: 'file',
		action: 'http://localhost:5000/upload',
		fileList: fileList,
		onChange: onChange
	}
	const [loaded, setLoaded] = useState(false);
	
	//http://localhost:5000/upload
	return (
		<Container className="margin-container">
			<Form>
				<h3 className="text-center text-white">Профиль</h3>
				<Row>
					<Col md={4} className="mb-3 p-2" style={{ border: ' 1px solid gray' }}>
						<div style={{ width: '400px' }} className="m-auto">
							{loaded ? null : (
								<div className="text-center">
									Loading...
								</div>
							)}
							<Image
								className="w-100 mb-3"
								style={loaded ? {} : { display: 'none' }}
								src={myimg}
								onLoad={() => setLoaded(true)}
							/>
						</div>
						<Form.Control type="file" size="sm" />
					</Col>
					<Col style={{ border: ' 1px solid gray' }}>
						<Form.Group as={Row} className="mb-3 p-2" controlId="formPlaintextPassword">
							<Form.Label column sm="2">
								Имя пользователя
							</Form.Label>
							<Col sm="10">
								<Input value="" />
								<Input disabled />
							</Col>
						</Form.Group>
					</Col>
				</Row>
			</Form>
		</Container>
	);
};

export default Profile;