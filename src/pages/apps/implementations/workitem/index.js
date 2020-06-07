import React from 'react'
import { Helmet } from 'react-helmet'
import DevelopersTableWide from '../../../../components/kit/widgets/Tables/implementations/DevelopersTableWide'

const DataSetManagement = () => {
  const classCollection = {
    datasetId: sessionStorage.getItem('datasetId'),
  }

  return (
    <div>
      <Helmet title="Workitem" />
      <div className="row">
        <div className="col-xl-9 col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="mb-2">
                <a
                  href="#"
                  onClick={e => e.preventDefault()}
                  className="text-dark font-size-24 font-weight-bold"
                >
                  DataSet #{classCollection.datasetId}
                </a>
              </div>
              <div>
                <DevelopersTableWide datasetId={classCollection.datasetId} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-12">
          <div className="pb-4 mb-3 border-bottom">
            <label className="font-weight-bold d-block" htmlFor="search-input">
              <span className="mb-2 d-inline-block">Search Fields</span>
              <input
                className="form-control width-100p"
                type="text"
                placeholder="Search fields..."
                id="search-input"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataSetManagement
