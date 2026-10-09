import pool from "./config/db.js";

const arg = process.argv[2];

async function run() {
  try {
    const [courses] = await pool.query("SELECT id, name, price_kobo FROM courses ORDER BY id ASC");
    console.log("\n📋 Current Courses & Prices in Database:");
    courses.forEach((c) => {
      console.log(`  [ID ${c.id}] ${c.name}: ₦${(c.price_kobo / 100).toLocaleString()} (${c.price_kobo} kobo)`);
    });

    if (!arg) {
      console.log("\n💡 Usage:");
      console.log("  node set-price.js 100       -> Sets courses to ₦100 (10,000 kobo)");
      console.log("  node set-price.js 1000      -> Sets courses to ₦1,000 (100,000 kobo)");
      console.log("  node set-price.js reset     -> Resets all courses back to ₦15,000 (1,500,000 kobo)\n");
      process.exit(0);
    }

    let targetKobo;
    if (arg === "reset") {
      targetKobo = 1500000;
      console.log("\n🔄 Resetting all courses back to standard ₦15,000 (1,500,000 kobo)...");
      await pool.query("UPDATE courses SET price_kobo = ?", [targetKobo]);
    } else {
      const naira = parseInt(arg, 10);
      if (isNaN(naira) || naira < 100) {
        console.error("❌ Minimum amount on Paystack is ₦100.");
        process.exit(1);
      }
      targetKobo = naira * 100;
      console.log(`\n⚙️ Updating course prices to ₦${naira.toLocaleString()} (${targetKobo} kobo)...`);
      await pool.query("UPDATE courses SET price_kobo = ?", [targetKobo]);
    }

    const [updated] = await pool.query("SELECT id, name, price_kobo FROM courses ORDER BY id ASC");
    console.log("\n✅ Successfully updated database:");
    updated.forEach((c) => {
      console.log(`  [ID ${c.id}] ${c.name}: ₦${(c.price_kobo / 100).toLocaleString()}`);
    });
    console.log("\n🎉 Ready for your real-money test payment!\n");
    process.exit(0);
  } catch (err) {
    console.error("❌ Database error:", err.message);
    process.exit(1);
  }
}

run();

