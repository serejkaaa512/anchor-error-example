import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { ErrorTest } from "../target/types/error_test";
import {
    ComputeBudgetProgram,
    sendAndConfirmRawTransaction,
    Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import BN from "bn.js";

describe("error-test", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.ErrorTest as Program<ErrorTest>;

  it("Is initialized!", async () => {
    const authority = anchor.web3.Keypair.generate();

    const airdropSignature = await provider.connection.requestAirdrop(
        authority.publicKey,
        LAMPORTS_PER_SOL * 12
    );
    await provider.connection.confirmTransaction(airdropSignature);

    // Add your test here.
    const id = anchor.web3.Keypair.generate().publicKey;
    const address = anchor.web3.Keypair.generate().publicKey;
      const hash = Buffer.from(Uint8Array.from([
          229, 67, 234,  59,  20, 142, 157, 185,
          233, 33, 176, 179, 196,   5,  54, 156,
          70, 29, 176, 105, 182,  52,  97, 150,
          7, 17,  52,  20,  67, 112, 229,  25
      ]));

      const payload = Buffer.from(Uint8Array.from([
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32,
          199, 159, 85, 123, 68, 48, 208, 40, 67, 129,
          161, 121, 106, 156, 75, 243, 44, 84, 117, 204,
          27, 183, 237, 120, 204, 144, 95, 205, 81, 93,
          19, 63, 199, 159, 85, 123, 68, 48, 208, 40, 67,
          129, 161, 121, 106, 156, 75, 243, 44, 84, 117,
          204, 27, 183, 237, 120, 204, 144, 95, 205, 81,
          93, 19, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0,
          0, 0, 18, 104, 116, 116, 112, 115, 58, 47, 47, 103,
          111, 111, 103, 108, 101, 46, 99, 111, 109]
      ));

      console.log(id);
      console.log(address);
      console.log(hash);
      console.log(payload);

    const a7 = anchor.web3.Keypair.generate().publicKey;
    const a8 = anchor.web3.Keypair.generate().publicKey;
    const a9 = anchor.web3.Keypair.generate().publicKey;
    const a10 = anchor.web3.Keypair.generate().publicKey;
    const a11 = anchor.web3.Keypair.generate().publicKey;
    const a12 = anchor.web3.Keypair.generate().publicKey;
    const a13 = anchor.web3.Keypair.generate().publicKey;
    const a14 = anchor.web3.Keypair.generate().publicKey;
    const a15 = anchor.web3.Keypair.generate().publicKey;
    const a16 = anchor.web3.Keypair.generate().publicKey;
    const a17 = anchor.web3.Keypair.generate().publicKey;
    const a18 = anchor.web3.Keypair.generate().publicKey;

    const instruction = await program.methods.initialize(
        id,
      hash,
      address,
      payload,
    )
        .accountsPartial({
          authority: authority.publicKey,
          a7,
          a8,
          a9,
          a10,
          a11,
          a12,
          a13,
          a14,
          a15,
          a16,
          a17,
          a18,
        })
        .signers([authority])
        .instruction();

      let tx = new Transaction();
      tx.add(ComputeBudgetProgram.setComputeUnitLimit({ units: 300_000 }));
      tx.add(instruction);
      tx.feePayer = authority.publicKey;
      const latestBlockhash = await provider.connection.getLatestBlockhash();
      tx.recentBlockhash = latestBlockhash.blockhash;
      tx.sign(authority);

      await sendAndConfirmRawTransaction(provider.connection, tx.serialize(), {
          commitment: "confirmed",
          skipPreflight: true,
      });

  });
});
