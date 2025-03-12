use cli_clipboard::{ClipboardContext, ClipboardProvider};
use regex::Regex;
use std::fs;
use pgp::{composed::signed_key::SignedSecretKey, Deserializable};
use pgp::composed::message::Message;

fn main() {
    let mut clip_ctx = ClipboardContext::new().unwrap();
    let clip_contents = clip_ctx.get_contents()
        .expect("failed reading clipboard, is it empty?");

    let message = Message::from_string(&clip_contents)
        .expect("invalid message in 'test.txt'")
        .0; // this looks fucking stupid lol

    let key_file = fs::read_to_string("./private_key.asc")
        .expect("file 'private_key.asc' not found");
    let key = SignedSecretKey::from_string(&key_file)
        .expect("invalid key in 'private_key.asc'").0;

    let decryptedbytes = message.decrypt(|| {"".to_string()}, &[&key])
        .expect("failed to decrypt message, is it the wrong key?")
        .0.get_content().unwrap().unwrap();
    let decrypted = String::from_utf8_lossy(&decryptedbytes);

    let output =
        Regex::new(r"[0-9a-f]{56}").unwrap()
        .find(&decrypted).expect("failed to find code in decoded message, is it from abacus?")
        .as_str().to_owned();

    clip_ctx.set_contents(output).unwrap();
}
