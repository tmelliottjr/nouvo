// UUID v7 Test
import { generateId } from "../lib/utils";

// Generate a few UUIDs and check their format
const uuids = Array.from({ length: 5 }, () => generateId());

console.log("Generated UUIDs (v7):");
uuids.forEach((uuid, index) => {
  console.log(`UUID ${index + 1}: ${uuid}`);

  // Validate UUID format (should match the UUID v7 pattern)
  const isValid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      uuid
    );
  console.log(`  Valid UUID v7: ${isValid}`);

  // For v7, the first part should be timestamp-based, so UUIDs generated close together
  // should have similar first sections
  if (index > 0) {
    const prevTimeHex = uuids[index - 1].split("-")[0];
    const currTimeHex = uuid.split("-")[0];
    const timeDiff = parseInt(currTimeHex, 16) - parseInt(prevTimeHex, 16);
    console.log(`  Time difference from previous: ${timeDiff}`);
  }
});

console.log("\nUUID v7 test completed.");
