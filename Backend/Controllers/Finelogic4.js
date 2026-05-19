import Fine from "../Models/FineSchema.js";

// ================= UPDATE FINE =================
export const updateFine = async (req, res) => {
  try {
    const { idi } = req.params;
    

    const {
      id,
     name,
      date,
      shift,
      violationType,
      amount,
      description,
    } = req.body;

    // ================= CHECK IF FINE EXISTS =================
    const existingFine = await Fine.findById(idi);

    if (!existingFine) {
      return res.status(404).json({
        success: false,
        message: "Fine not found",
      });
    }

    // ================= UPDATE FIELDS =================
    existingFine.id = id;
    existingFine.name = name;
    existingFine.date = date;
    existingFine.shift = shift;
    existingFine.violationType = violationType;
    existingFine.amount = amount;
    existingFine.description = description;

    // ================= SAVE UPDATED DOCUMENT =================
    const updatedFine = await existingFine.save();

    return res.status(200).json({
      success: true,
      message: "Fine updated successfully",
      data: updatedFine,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error while updating fine",
    });
  }
};