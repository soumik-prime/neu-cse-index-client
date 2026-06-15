// app/dashboard/higher-studies/page.tsx
// USER: manage own higher study records

export default function HigherStudiesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="label mb-1">Dashboard</p>
          <h1 className="text-2xl font-bold text-text-bright m-0">Higher Studies</h1>
          <p className="text-text-secondary text-sm mt-1">
            Track your postgraduate and doctoral pursuits.
          </p>
        </div>
        <button className="btn btn-primary">+ Add Entry</button>
      </div>

      {/* API: GET /higherStudy/:id (own records via profile) */}
      {/* API: POST /higherStudy/add */}
      {/* API: PATCH /higherStudy/update/:id */}
      {/* API: DELETE /higherStudy/delete/:id */}

      <div className="surface p-6 text-text-muted text-sm">
        [ Higher study records — connect to /higherStudy ]
      </div>
    </div>
  );
}