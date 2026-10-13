export const metadata = { title: "Wezwanie do zapłaty" };

export default function Page() {
  return (
    <iframe
      src="/wezwanie.html"
      title="Formularz wezwania do zapłaty"
      style={{ width: "100%", height: "100vh", border: 0 }}
    />
  );
}
