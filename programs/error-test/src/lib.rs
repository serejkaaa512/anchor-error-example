use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{Mint, Token, TokenAccount};

declare_id!("9eN67xH77UmfCCs7RWjU63MDSRXgePoo3uisghntf7Y");

#[program]
pub mod error_test {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>,
                      id: Pubkey,
                      hash: [u8; 32],
                      address: Pubkey,
                      payload: Vec<u8>,
    ) -> Result<()> {
        msg!("id: {:?}", id);
        msg!("hash: {:02x?}", hash);
        msg!("address: {:?}", address);
        msg!("payload: {:02x?}", payload);
        Ok(())
    }
}


#[derive(Accounts)]
#[instruction(id: Pubkey)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    /// CHECK:
    #[account(
    init,
    payer = authority,
    mint::decimals = 0,
    mint::authority = a7,
    mint::freeze_authority = a7,
    seeds = ["mint".as_bytes(), &id.to_bytes()],
    bump,
    )]
    pub mint: Account<'info, Mint>,
    #[account(
    init,
    payer = authority,
    associated_token::mint = mint,
    associated_token::authority = a7,
    )]
    pub token_account: Account<'info, TokenAccount>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    /// CHECK:
    pub a7: AccountInfo<'info>,
    /// CHECK:
    pub a8: AccountInfo<'info>,
    /// CHECK:
    pub a9: AccountInfo<'info>,
    /// CHECK:
    pub a10: AccountInfo<'info>,
    /// CHECK:
    pub a11: AccountInfo<'info>,
    /// CHECK:
    pub a12: AccountInfo<'info>,
    /// CHECK:
    pub a13: AccountInfo<'info>,
    /// CHECK:
    pub a14: AccountInfo<'info>,
    /// CHECK:
    pub a15: AccountInfo<'info>,
    /// CHECK:
    pub a16: AccountInfo<'info>,
    /// CHECK:
    pub a17: AccountInfo<'info>,
    /// CHECK:
    pub a18: AccountInfo<'info>,
    #[account(
    mut,
    seeds = [
    b"metadata".as_ref(),
    token_program.key().as_ref(),
    mint.key().as_ref(),
    b"edition".as_ref(),
    ],
    bump,
    seeds::program = token_program.key()
    )]
    /// CHECK:
    pub token_pda1: UncheckedAccount<'info>,
    #[account(
    mut,
    seeds = [
    b"metadata".as_ref(),
    token_program.key().as_ref(),
    mint.key().as_ref(),
    ],
    bump,
    seeds::program = token_program.key()
    )]
    /// CHECK:
    pub token_pda2: UncheckedAccount<'info>,
}
