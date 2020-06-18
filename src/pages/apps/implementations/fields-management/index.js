import React from 'react'
import { Helmet } from 'react-helmet'
import DevelopersTableWide from '../../../../components/kit/widgets/Tables/implementations/DevelopersTableWide'

const DataSetManagement = () => {
  const classCollection = {
    datasetId: sessionStorage.getItem('datasetId'),
  }

  return (
    <div>
      <Helmet title="Fields" />
      <div className="row">
        <div className="col-xl-13 col-lg-16">
          <div className="card">
            <div className="card-body">
              <div className="mb-2">
                <a
                  href="#"
                  onClick={e => e.preventDefault()}
                  className="text-dark font-size-24 font-weight-bold"
                >
                  Fields
                </a>
              </div>
              <div>
                <DevelopersTableWide datasetId={classCollection.datasetId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataSetManagement
