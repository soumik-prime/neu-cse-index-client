// app/dashboard/countries/page.tsx
// SUPERADMIN only

export default function CountriesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="label mb-1">System</p>
          <h1 className="text-2xl font-bold text-text-bright m-0">Countries</h1>
          <p className="text-text-secondary text-sm mt-1">
            Manage the country reference list.
          </p>
        </div>
        <button className="btn btn-primary">+ Add Country</button>
      </div>

      {/* API: GET /countries */}
      {/* API: POST /countries/add { iso2, name, emoji } */}
      {/* API: PATCH /countries/update/:iso2 { name?, emoji? } */}
      {/* API: DELETE /countries/delete/:iso2 */}

      <div className="surface p-6 text-text-muted text-sm">
        [ Countries table — connect to GET /countries ]
      </div>
    </div>
  );
}