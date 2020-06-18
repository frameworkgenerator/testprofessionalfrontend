import React from 'react'
import { Helmet } from 'react-helmet'
import { Menu, Dropdown } from 'antd'
import TestSets from 'components/kit/widgets/Lists/implementations/Testsets'
import TestCases from 'components/kit/widgets/Lists/implementations/Testcases'

const dropdownMenu = (
  <Menu>
    <Menu.Item>
      <a href="#" onClick={e => e.preventDefault()}>
        Action
      </a>
    </Menu.Item>
    <Menu.Item>
      <a href="#" onClick={e => e.preventDefault()}>
        Another action
      </a>
    </Menu.Item>
    <Menu.Item>
      <a href="#" onClick={e => e.preventDefault()}>
        Something else here
      </a>
    </Menu.Item>
    <div className="dropdown-divider" />
    <Menu.Item>
      <a href="#" onClick={e => e.preventDefault()}>
        Separated link
      </a>
    </Menu.Item>
  </Menu>
)

const ExtraAppsJiraDashboard = () => {
  return (
    <div>
      <Helmet title="Jira Dashboard" />
      <div className="row">
        <div className="col-lg-6">
          <div className="card kit__utils__cardMarked kit__utils__cardMarked--primary">
            <div className="card-header card-header-flex">
              <div className="d-flex flex-column justify-content-center mr-auto">
                <h5 className="mb-0">Testsets</h5>
              </div>
              <div className="d-flex flex-column justify-content-center">
                <Dropdown overlay={dropdownMenu} placement="bottomRight">
                  <button type="button" className="btn btn-light">
                    <i className="fe fe-more-vertical" />
                  </button>
                </Dropdown>
              </div>
            </div>
            <div className="card-body">
              <TestSets />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card kit__utils__cardMarked kit__utils__cardMarked--primary">
            <div className="card-header card-header-flex">
              <div className="d-flex flex-column justify-content-center mr-auto">
                <h5 className="mb-0">Testcases</h5>
              </div>
              <div className="d-flex flex-column justify-content-center">
                <Dropdown overlay={dropdownMenu} placement="bottomRight">
                  <button type="button" className="btn btn-light">
                    <i className="fe fe-more-vertical" />
                  </button>
                </Dropdown>
              </div>
            </div>
            <div className="card-body">
              <TestCases />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExtraAppsJiraDashboard
