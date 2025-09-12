import Header from '../components/Vendor/Header'
import Sidebar from '../components/Vendor/Sidebar'
import VendorList2 from '../components/Vendor/VendorList2'

const Vendor = () => {
  return (
    <div className='w-full'>
      <Header />
      <div className='flex'>
        <Sidebar />
        <div className="flex-1">
          <VendorList2/>
        </div>
      </div>

    </div>
  )
}

export default Vendor