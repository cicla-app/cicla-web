import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../../_variables.scss';
import '../access-data/Access-data.scss'
import { withRouter } from 'react-router-dom';
import { withAuthConsumer } from '../../contexts/AuthStore';
import {
  Input, PageHeader, Button, Select, Alert
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
    visible: false
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
      user: newUser,
      visible: true
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
        contraceptives: contraceptives
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
  
  handleClose = () => {
    this.setState({ visible: false });
  }

render() {
  const { user } = this.state;
  const contraceptives = user && user.contraceptives;
  const Option = Select.Option;

  if (!user) return <p style={{ color: 'black' }}>Loading</p>
    return (
      <div>
        <PageHeader
          onBack={() => this.goBack()}
          title="DATOS DE TU CICLO">
        </PageHeader>
        <div className="background">
          <div className="container-data">
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
                defaultValue={contraceptives ? 'yes' : 'no'}
                name="contraceptives"
                onChange={this.handleSelectChange}
                style={{ width: '100%' }}>
                <Option value="yes">Sí</Option>
                <Option value="no">No</Option>
              </Select>
              <Button
                block
                size="large"
                onClick={this.updateUser}>
                Guardar
              </Button>
              { this.state.visible && 
                <Alert
                  message="Hemos guardado tus datos"
                  type="success"
                  showIcon
                  closable
                  afterClose={this.handleClose} />
              }
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withAuthConsumer(CicleData));