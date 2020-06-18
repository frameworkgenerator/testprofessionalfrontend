import React from 'react'
import { connect } from 'react-redux'
import { Button, Form } from 'antd'
import style from '../style.module.scss'

const mapStateToProps = ({ user, settings, dispatch }) => ({
  dispatch,
  user,
  authProvider: settings.authProvider,
  logo: settings.logo,
})

const Login = ({ dispatch, user, logo }) => {
  const onFinish = values => {
    dispatch({
      type: 'user/LOGIN',
      payload: values,
    })
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div>
      <div className="text-center mb-5">
        <h1 className="mb-5 px-3">
          <strong>Welcome to {logo}</strong>
        </h1>
        <p>
          Test application for storing test objects
          <br />
          Store and manage json object for using in test automation frameworks
          <br />
          Credentials for testing purposes - <strong>h.bruins@ventus.nl</strong> /{' '}
          <strong>Ventus Test Professionals</strong>
        </p>
      </div>
      <div className={`card ${style.container}`}>
        <div className="text-dark font-size-24 mb-3">
          <strong>Sign in to your account</strong>
        </div>
        <Form
          layout="vertical"
          hideRequiredMark
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="mb-4"
        >
          <Button
            type="primary"
            size="large"
            className="text-center w-100"
            htmlType="submit"
            loading={user.loading}
          >
            <strong>Sign in</strong>
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Login)
