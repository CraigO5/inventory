export default function Home() {
  return (
    <>
      <h1>CacaoTrack</h1>
      <p>Your one stop shop for inventory management!</p>
      <div className="flex flex-col gap-4 justify-center items-center">
        <input type="email" placeholder="example@email.com" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
        <button>Sign Up</button>
      </div>
    </>
  );
}
