// app/dashboard/academics/page.tsx
// SUPERADMIN only: manage academic batches/sessions

export default function AcademicsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="label mb-1">System</p>
          <h1 className="text-2xl font-bold text-text-bright m-0">Academics</h1>
          <p className="text-text-secondary text-sm mt-1">
            Manage batch numbers, sessions and enrollment years.
          </p>
        </div>
        <button className="btn btn-primary">+ Add Batch</button>
      </div>

      {/* API: GET /academics */}
      {/* API: POST /academics { batch, session, enrollmentYear } */}
      {/* API: PUT /academics/:batch { session?, enrollmentYear? } */}
      {/* API: DELETE /academics/:batch */}

      <div className="surface p-6 text-text-muted text-sm">
        [ Academic batches table — connect to GET /academics ]
      </div>
    </div>
  );
}