import { trpc } from "./trpc";

export function Progress({ kursId }: { kursId: string }) {
  const overview = trpc.progress.overview.useQuery({ kursId });

  if (overview.isLoading) {
    return <p>Lädt…</p>;
  }

  const fachgebiete = overview.data ?? [];

  if (fachgebiete.length === 0) {
    return <p>Noch keine Karteikarten-Fortschrittsdaten für diesen Kurs. Lerne ein paar Karteikarten.</p>;
  }

  return (
    <section className="progress-overview">
      {fachgebiete.map((fachgebiet) => (
        <div key={fachgebiet.id} className="progress-fachgebiet">
          <div className="progress-header">
            <span>{fachgebiet.title}</span>
            <span>
              {fachgebiet.percent}% ({fachgebiet.mastered}/{fachgebiet.total})
            </span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${fachgebiet.percent}%` }} />
          </div>
          <div className="progress-themen">
            {fachgebiet.themen.map((thema) => (
              <div key={thema.id} className="progress-thema">
                <div className="progress-header progress-header--thema">
                  <span>{thema.title}</span>
                  <span>
                    {thema.percent}% ({thema.mastered}/{thema.total})
                  </span>
                </div>
                <div className="progress-bar progress-bar--thema">
                  <div className="progress-bar-fill" style={{ width: `${thema.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
