import { InfoIcon } from "./Icons";
import { trpc } from "./trpc";

export function Progress({ kursId }: { kursId: string }) {
  const overview = trpc.progress.overview.useQuery({ kursId });

  if (overview.isLoading) {
    return <p>Lädt…</p>;
  }

  const fachgebiete = overview.data ?? [];

  if (fachgebiete.length === 0) {
    return (
      <div className="alert alert-info">
        <InfoIcon />
        <div>Noch keine Karteikarten-Fortschrittsdaten für diesen Kurs. Lerne ein paar Karteikarten.</div>
      </div>
    );
  }

  return (
    <>
      {fachgebiete.map((fachgebiet) => (
        <div key={fachgebiet.id} className="stack">
          <div className="progress-block is-total">
            <div className="progress-head">
              <b>{fachgebiet.title}</b>
              <span>
                {fachgebiet.percent} % ({fachgebiet.mastered}/{fachgebiet.total})
              </span>
            </div>
            <div className="progress-bar">
              <span style={{ width: `${fachgebiet.percent}%` }} />
            </div>
          </div>
          {fachgebiet.themen.map((thema) => (
            <div key={thema.id} className="progress-block">
              <div className="progress-head">
                <b>{thema.title}</b>
                <span>
                  {thema.percent} % ({thema.mastered}/{thema.total})
                </span>
              </div>
              <div className="progress-bar">
                <span style={{ width: `${thema.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
