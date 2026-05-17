import Attendence from "../Models/attendenceSchema.js";

export const saveAttendance = async (req, res) => {
  try {
    const { data } = req.body;
    console.log(data)

    // 1. VALIDATION (basic safety check)
    if (!data || !Array.isArray(data) || data.length === 0) {
      return res.status(400).json({
        message: "Attendance data is required",
      });
    }

    // 2. PROCESS EACH RECORD
    const results = [];

    for (let item of data) {
      const { id,name, date, shift, status } = item;

      if (!id || !name || !date || !shift || !status) {
        continue; // skip invalid records
      }

      const updated = await Attendence.findOneAndUpdate(
        {
          id,
          name,
          date,
          shift,
        },
        {
          $set: {
            status,
          },
        },
        {
          upsert: true, // create if not exists
          new: true,     // return updated document
        }
      );

      results.push(updated);
    }

    // 3. RESPONSE
    return res.status(200).json({
      message: "Attendance saved successfully",
      total: results.length,
      data: results,
    });

  } catch (error) {
    console.log("Save Attendance Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};