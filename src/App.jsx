import './App.css'
import Login from './Pages/Login/Login.jsx'
import Drawer from './components/Drawer/Drawer.jsx'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import CreateJob from './Pages/NewJob/CreateJob.jsx'
import JobReport from './Pages/NewJob/Reports/JobReport.jsx'
import JobCardReport from './Pages/NewJob/Reports/JobCardReport.jsx'
import CreateEstimate from './Pages/Estimate/CreateEstimate.jsx'
import EstimateReport from './Pages/Estimate/Reports/EstimateReport.jsx'
import Supplimentry from './Pages/Estimate/Supplimentry.jsx'
import PreviewEstimate from './Pages/Estimate/PreviewEstimate.jsx'
import PreviewSupplimentry from './Pages/Estimate/PreviewSupplimentry.jsx'
import SupplimentryReport from './Pages/Estimate/Reports/SupplimentryReport.jsx'
import InsuranceInvoice from './Pages/Invoice/Insurance/InsuranceInvoice.jsx'
import InvoiceReport from './Pages/Invoice/Reports/invoiceReport.jsx'
import Products from './Pages/More Categories/Products/Products.jsx'
import Vehicles from './Pages/More Categories/Vehicles/Vehicles.jsx'
import Insurance from './Pages/More Categories/Insurance/Insurance.jsx'
import PersonalInvoice from './Pages/Invoice/Non-Insurance/PersonalInvoice.jsx'
import PreviewPersonalInvoice from './Pages/Invoice/Non-Insurance/PersonalInvoicePreview.jsx'
import PersonalInvoiceReport from './Pages/Invoice/Reports/PersonalInvoiceReport.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/new-job' element={<CreateJob/>}/>
        <Route path='/job-report' element={<JobReport/>}/>
        <Route path='/jobCard-report' element={<JobCardReport/>}/>
        <Route path='/createEstimate' element={<CreateEstimate/>}/>
        <Route path='/supplimentryEstimate' element={<Supplimentry/>}/>
        <Route path='/estimate-preview' element={<PreviewEstimate/>}/>
        <Route path='/estimate-report/:jobID' element={<EstimateReport/>}/>
        <Route path='/supplimentry-preview' element={<PreviewSupplimentry/>}/>
        <Route path='/supplimentry-report/:jobID/:supNo' element={<SupplimentryReport/>}/>
        <Route path='/invoice/insurance/insuranceInvoice' element={<InsuranceInvoice/>}/>
        <Route path='/invoice/insurance/invoiceReport/:jobID' element={<InvoiceReport/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/vehicles' element={<Vehicles/>}/>
        <Route path='/insurance-companies' element={<Insurance/>}/>
        <Route path='/invoice/personalInvoice' element={<PersonalInvoice/>}/>
        <Route path='/invoice/personalInvoice-preview' element={<PreviewPersonalInvoice/>}/>
        <Route path='/invoice/personalInvoice-report/:jobID' element={<PersonalInvoiceReport/>}/>
      </Routes>
    </BrowserRouter>
    // <>
    // <EstimateReport/>
    // </>
  )
}

export default App
