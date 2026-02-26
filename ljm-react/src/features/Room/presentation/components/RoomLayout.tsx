interface Props {
  children: React.ReactNode;
}

export default function RoomLayout({ children }: Props) {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 overflow-hidden">
      
      {/* Fondo */}
      <div className="fixed inset-0 z-0">
        <img
          alt="Luxury cruise deck at sunset"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC452Pu70ahp8xhmTebKdEz4fs6mG964FtpeFL1U5001s3JZbsgQgZJVGyxS1lxnHqyqvGMSl8olisyBSMjccvpKAqRApqM3ocCqvxYXcSRN9dUlQl-Sn4yzlddCpdnFYs1bq3LTCujhiT3oAer_G2-YVueQcf4g4_tYvnNfe0b9ziLSYO_NJgvU6nIMqsoziJcpyekFhl3t4UdTuJWGl5P_ekT8K1XdTkU_2tZ3JDs9IchuSSxccleZeP-qQ2QP4bvoHAjxxVUx80"
        />
        <div className="absolute inset-0 bg-navy/40"></div>
      </div>

      {/* Panel glass */}
      <div className="relative z-10 w-full max-w-6xl glass-panel rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
}