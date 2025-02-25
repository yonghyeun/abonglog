import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
  display: "swap"
});

export const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html className={notoSans.className}>
      <body className="bg-primary flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

const Header = () => (
  <header className="media-padding-x flex items-center justify-between py-4">
    <h1>abonglog</h1>
    <p>darkmode</p>
  </header>
);

const Footer = () => (
  <footer className="bg-tertiary media-padding-x py-4">
    <div className="flex gap-4">
      <div className="flex-grow">
        <h3>abonglog</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore</p>
      </div>
      <nav className="flex flex-grow flex-col">
        <h3>abonglog</h3>
        <a href="">Something</a>
        <a href="">Something</a>
        <a href="">Something</a>
      </nav>
      <nav className="flex flex-grow flex-col">
        <h3>abonglog</h3>
        <a href="">Something</a>
        <a href="">Something</a>
        <a href="">Something</a>
      </nav>
      <nav className="flex flex-grow flex-col">
        <h3>abonglog</h3>
        <a href="">Something</a>
        <a href="">Something</a>
        <a href="">Something</a>
      </nav>
    </div>
    <p className="text-center">@ 2025 copy right 어쩌구저쩌구</p>
  </footer>
);
