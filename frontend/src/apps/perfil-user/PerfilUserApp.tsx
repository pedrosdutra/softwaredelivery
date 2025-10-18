import { Header } from "./components/Header";
import { UserProfile } from "./components/UserProfile";

export default function PerfilUserApp() {
  return (
    <div className="min-h-screen bg-orange-25" style={{ backgroundColor: "#fffbf9" }}>
      <Header />
      <main className="flex flex-col items-center justify-center mt-20 px-6">
        <UserProfile />
      </main>
    </div>
  );
}
