import React from 'react'
import { Helmet } from 'react-helmet'
import TestPlanTableWide from '../../../../components/kit/widgets/Tables/implementations/TestPlanTableWide'

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
                  Testplans
                </a>
              </div>
              <div>
                <TestPlanTableWide datasetId={classCollection.datasetId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataSetManagement
