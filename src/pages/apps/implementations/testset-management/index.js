import React from 'react'
import { Helmet } from 'react-helmet'
import TestSetTableWide from '../../../../components/kit/widgets/Tables/implementations/TestSetTableWide'

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
                  Testset
                </a>
              </div>
              <div>
                <TestSetTableWide datasetId={classCollection.datasetId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataSetManagement
