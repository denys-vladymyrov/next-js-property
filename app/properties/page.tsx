import PropertyCard from '@/components/PropertyCard';
import PropertySearchForm from '@/components/PropertySearchForm';
import Pagination from '@/components/Pagination';
import Property from '@/models/Property';
import connectDB from '@/config/database';
import { IProperty } from '@/models/Property';


const PropertiesPage = async ({ searchParams: { pageSize = '9', page = '1' } } :
{ searchParams: { pageSize: string, page: string}}) => {

  await connectDB();
  const skip = (parseInt(page) - 1) * parseInt(pageSize);

  const total = await Property.countDocuments({});
  const properties = await Property.find({}).skip(skip).limit(parseInt(pageSize));

  const showPagination = total > parseInt(pageSize);

  return (
    <>
      <section className='bg-blue-700 py-4'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start'>
          <PropertySearchForm />
        </div>
      </section>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <h1 className='text-2xl mb-4'>Browse Properties</h1>
          {properties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {properties.map((property: IProperty, index: number) => (
                <PropertyCard property={property} key={property._id?.toString()} />
              ))}
            </div>
          )}
          {showPagination && (
            <Pagination
              page={parseInt(page)}
              pageSize={parseInt(pageSize)}
              totalItems={total}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default PropertiesPage;
