// app/dashboard/institutions/page.tsx
// ADMIN + SUPERADMIN: manage institutions

export default function InstitutionsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="label mb-1">Management</p>
          <h1 className="text-2xl font-bold text-text-bright m-0">Institutions</h1>
          <p className="text-text-secondary text-sm mt-1">
            Manage universities, colleges and schools.
          </p>
        </div>
        <button className="btn btn-primary">+ Add Institution</button>
      </div>

      {/* API: GET /institutions?page&limit&searchTerm&type&countryISO2 */}
      {/* API: POST /institutions/add { name, type, website?, addressId } */}
      {/* API: PATCH /institutions/update/:id */}
      {/* API: DELETE /institutions/delete/:id */}

      <div className="surface p-6 text-text-muted text-sm">
        [ Institutions table — connect to GET /institutions ]
      </div>
    </div>
  );
}