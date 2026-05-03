import Guard from "../Models/guardSchema.js";

export const createGuard = async (req, res) => {
  try {
    const {
      id,
      name,
      fatherName,
      age,
      cnicNo,
      phone1,
      phone2,
      address,
      reference,
      designation,
      education,
      entryDate
    } = req.body;

    const files = req.files;

    const newGuard = new Guard({
      id,
      name,
      fatherName,
      age,
      cnicNo,
      phone1,
      phone2,
      address,
      reference,
      designation,
      education,
      entryDate,

      profilePic: files.profilePic?.[0]?.path,
      cnicFront: files.cnicFront?.[0]?.path,
      cnicBack: files.cnicBack?.[0]?.path
    });

    await newGuard.save();

    res.status(201).json({
      message: "Guard created successfully",
      guard: newGuard
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};