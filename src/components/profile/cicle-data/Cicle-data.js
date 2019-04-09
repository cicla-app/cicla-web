import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../../_variables.scss';
import '../access-data/Access-data.scss'
import { withRouter } from 'react-router-dom';
import { withAuthConsumer } from '../../contexts/AuthStore';
import {
  Input, Row, Col, PageHeader, Button, Select
} from 'antd';
import { createBrowserHistory } from 'history';
import authService from '../../services/AuthService'

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
    authService.getUser(this.state.user.id)
      .then(user => this.setState({ user: user})
  )}

  goBack(){
    history.goBack();
  }

  updateUser = () => {
    const newUser = {
      ...this.state.user
    }
    authService.updateUser(newUser);
    this.setState({
      user: newUser
    }, () => console.log(this.state.user))
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
        contraceptives: contraceptives
    }}, () => console.log(contraceptives));
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
  console.log(this.state.user.contraceptives)

  const { user } = this.state;
  const contraceptives = user && user.contraceptives ? 'yes' : 'no';

  console.log('PRUEBA', contraceptives);

  const Option = Select.Option;

  if (contraceptives) {
    
  }

  if (!user) return <p style={{ color: 'black' }}>Loading</p>
    return (
      <div>
        <PageHeader
          onBack={() => this.goBack()}
          title="DATOS DE TU CICLO">
        </PageHeader>
        <Row className="container-data">
          <Col span={20} offset={2}>
            <form onSubmit={this.onSubmit}>
              <p>¿Cuántos días dura tu regla aproximadamente?</p>
              <Input
                type="number"
                size="large"
                className='mb-2'
                name="periodDays"
                placeholder="Duración de la regla"
                onChange={this.handleChange}
                value={this.state.user.periodDays}
                onBlur={this.handleBlur} />
              <p>¿Cuántos días dura tu ciclo aproximadamente?</p>
              <Input
                type="number"
                size="large"
                className='mb-2'
                name="cycleDays"
                placeholder="Duración del ciclo"
                onChange={this.handleChange}
                value={user.cycleDays}
                onBlur={this.handleBlur}/>
              <p>¿Usas anticonceptivos hormonales?</p>
              <Select
                defaultValue={contraceptives}
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