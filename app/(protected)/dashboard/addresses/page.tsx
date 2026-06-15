// app/dashboard/addresses/page.tsx
// SUPERADMIN only

export default function AddressesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="label mb-1">System</p>
          <h1 className="text-2xl font-bold text-text-bright m-0">Addresses</h1>
          <p className="text-text-secondary text-sm mt-1">
            Manage city/country address entries.
          </p>
        </div>
        <button className="btn btn-primary">+ Add Address</button>
      </div>

      {/* API: GET /addresses?iso2= (SUPERADMIN + ADMIN) */}
      {/* API: POST /addresses/add { city, countryISO2 } */}
      {/* API: DELETE /addresses/delete/:id */}

      <div className="surface p-6 text-text-muted text-sm">
        [ Addresses table — connect to GET /addresses ]
      </div>
    </div>
  );
}