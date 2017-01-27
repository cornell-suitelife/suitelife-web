import React from 'react';
import { Select, Input, Button, Card } from 'antd';

class Messages extends React.Component {
	constructor(props) {
		super(props);

		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleAuthorChange = this.handleAuthorChange.bind(this);
		this.handleSendClick = this.handleSendClick.bind(this);

		this.state = {
			author: 'Sebastian',
			messages: []
		};
	}

	componentDidMount() {
		this.props.socket.on('message', data => {
      this.setState((prevState, props) => ({
      	messages: prevState.messages.concat([data])
      }));
    });
	}

	handleAuthorChange(value, option) {
		this.setState({ author: value });
	}

	handleTextChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSendClick(event) {
		const socket = this.props.socket;

		this.setState({
			value: ''
		});

		socket.emit('message', {
			data: {
				author: this.state.author,
				text: this.state.value,
				id: 0
			}
		});
	}

	render() {
		const messages = this.state.messages.map((message, i) => (
			<li key={message.data.id} style={{ padding: 20 }}>
				<Card title={message.data.author} bordered={false} style={{ width: 200 }}>
		      <p>{message.data.text}</p>
		    </Card>
	    </li>
		));

		return (
			<div>
				<Select defaultValue="Sebastian" style={{ width: 120 }} onChange={this.handleAuthorChange}>
					<Select.Option value="Sebastian">Sebastian</Select.Option>
		      <Select.Option value="Daniel">Daniel</Select.Option>
		      <Select.Option value="Chase">Chase</Select.Option>
		      <Select.Option value="Ning Ning">Ning Ning</Select.Option>
		      <Select.Option value="Nick">Nick</Select.Option>
		    </Select>
				<Input placeholder='Send message...' onChange={this.handleTextChange} onPressEnter={this.handleSendClick} style={{ width: 480, margin: 10 }}/>
		    <Button type='primary' onClick={this.handleSendClick}>Send</Button>
		    <ul>
		    	{messages}
	    	</ul>
			</div>
		);
	}
}

export default Messages;