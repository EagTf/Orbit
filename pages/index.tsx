import { BN, ProgramAccount } from "@project-serum/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import type { NextPage } from "next";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import Raffle from "../src/components/raffle/raffle";
import { ContractContext } from "../src/context/contract";
import styles from "../styles/home.module.scss";
import styles2 from '../src/components/raffle/raffle.module.scss';
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const [raffles, setRaffles] = useState<JSX.Element[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const program = useContext(ContractContext);

  const fetchRaffles = async () => {
    if (!program) return;
    const data = await program.program.account.raffle.all();
    await new Promise((r) => setTimeout(r, 2000));
    console.log("Accounts: ", data);
    setRaffles(
      data.map((account) => (
        <Raffle
          key={account.publicKey.toString()}
          account={{
            author: account.account.authority,
            title: account.account.title,
            description: account.account.description,
            fee: 0,
            ends: account.account.ends.toNumber(),
            image: account.account.image,
          }}
          publicKey={account.publicKey}
        />
      ))
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchRaffles();
  }, [program]);

  return (
    <div className={styles.container}>

      <Head>
         <title>Orbit Space | Raffle House</title>
        <meta property="og:title" content={'Orbits Space'} key="ogtitle" />
        <meta property="og:description" content={'Orbit Space: A Raffle House'} key="ogdesc" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;400;500;600;700;800;900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
           <link rel = "icon" href ="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3TMxuBEMAV3BQunMBrFtKf8UQT2LmJchVbnV2o2ddkZU/logo.png"></link>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
      </Head>

      <div className={styles.disclaimer}>
        <h3>Under Development!</h3>
        <p>
          This part is still under development, go back to the current hosted raffle 
        </p>
      </div>
      <hr style={{ margin: "50px 0" }} />

      <div className={styles2.container}>
            <div className={styles2.title}>
                Gothic Degens
            </div>
            <div className={styles2.image}>
                <img src="https://cdn.discordapp.com/attachments/958811122943815740/988008214761209857/IMG-20220619-WA0018.jpg" draggable={false}/>
            </div>
            <div className={styles2.footer_button} onClick={() => router.push(`/raffle/b8zPDzGuMToUtSuJgP7e4cRX5wKyWsxnRfeDfW11xxk`)}>
                MORE INFO
            </div>
        </div>
        

      </div>
  );
};

export default Home;

