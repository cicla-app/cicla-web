import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../../_variables.scss';
import { withRouter } from 'react-router-dom';
import { withAuthConsumer } from '../../contexts/AuthStore';
import {
  Input, Row, Col, PageHeader, Button, Select
} from 'antd';
import { createBrowserHistory } from 'history';
import AuthService from '../../services/AuthService'

const history = createBrowserHistory();

class CicleData extends Component {
  state = {
    user: {
      ...this.props.user,
      cycleDays: '',
      periodDays:'',
      contraceptives: ''
    },
  };
  userSubscription = undefined

  componentDidMount = () => {
    AuthService.getUser(this.state.user.id)
      .then(user => this.setState({ user: user})
  )
   console.log(this.state)}

  goBack(){
    history.goBack();
  }

  updateUser = () => {
    const newUser = {
      ...this.state.user
    }
    AuthService.updateUser(newUser);
    this.setState({
      user: newUser
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      },
    })
  }

  handleSelectChange = value => {
    const contraceptives = value === 'yes'? true : false;
    this.setState({user: {
      ...this.state.user,
        contraceptives
    }});
  }

  handleBlur = (event) => {
    const { name } = event.target;
    this.setState({
      touch: {
        ...this.state.touch,
        [name]: true
      }
    })
  }

render() {
  const { user } = this.state;
  const Option = Select.Option;
  if (!user) return <p style={{ color: 'black' }}>Loading</p>
    return (
      <div>
        <PageHeader
          onBack={() => this.goBack()}
          title="Datos de ciclo">
        </PageHeader>
        <Row className="mt-3">
          <Col span={20} offset={2}>
            <form onSubmit={this.onSubmit}>
              <Input
                type="number"
                size="large"
                className='mb-2'
                name="periodDays"
                placeholder="Duración de la regla"
                onChange={this.handleChange}
                value={this.state.user.periodDays}
                onBlur={this.handleBlur} />
              <Input
                type="number"
                size="large"
                className='mb-2'
                name="cycleDays"
                placeholder="Duración del ciclo"
                onChange={this.handleChange}
                value={user.cycleDays}
                onBlur={this.handleBlur}/>
              <Select
                defaultValue={user.contraceptives ? 'yes' : 'no'}
                name="contraceptives"
                onChange={this.handleSelectChange}
                style={{ width: '100%' }}>
                <Option value="yes">Sí</Option>
                <Option value="no">No</Option>
              </Select>
              <Button
                className="my-3"
                block
                size="large"
                onClick={this.updateUser}>
                Guardar
              </Button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(withAuthConsumer(CicleData));