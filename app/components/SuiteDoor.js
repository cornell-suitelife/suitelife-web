import React from 'react';
import { Row, Col, Card, Select, Button } from 'antd';

class SuiteDoor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true
		};
	}

	componentDidMount() {
		this.setState({
			loading: false
		});
	}

	render() {
		return (
			<div className='suite-door' style={{ padding: '30px' }}>
				<Row>
					<Col span='8'>
						<Card title='Automatic Opener' bordered={false} loading={this.state.loading}>
							<p>The door is currently <b style={{ color: 'red' }}>CLOSED</b>.</p>
							<label>Open for</label>
							<Select defaultValue='5 seconds' style={{ width: 120, padding: 10 }} onChange={this.handleOpenTimeChange}>
								<Select.Option value='5 seconds'>5 seconds</Select.Option>
					      <Select.Option value='10 seconds'>10 seconds</Select.Option>
					      <Select.Option value='15 seconds'>15 seconds</Select.Option>
					      <Select.Option value='20 seconds'>20 seconds</Select.Option>
					      <Select.Option value='25 seconds'>25 seconds</Select.Option>
					    </Select>
					    <Button type='primary'>Open</Button>
						</Card>
					</Col>
					<Col span='8'>
						<Card title='Peephole Stream' bordered={false} bodyStyle={{ padding: 0 }}>
							<img src='/public/img/peephole.jpg' alt='peephole' width='100%'/>
						</Card>
					</Col>
					<Col span='8'>
						<Card title='History' bordered={false} loading>
							<p>Sebastian opened the door for 20 seconds.</p>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

export default SuiteDoor;