import axios from "axios";
import  jwt from "jsonwebtoken";

// funkcija za proveru ispravnosti JWT tokena
export const checkJwt = async (req, res, next) => {
  try {

    // učitavanje adrese udaljenog servera iz .env datoteke
    const remoteUrl = process.env.REMOTE_URL;

    // provera da li je adresa udaljenog servera definisana u .env datoteci
    if (!remoteUrl) {
      throw new Error(
        "Adresa udaljenog servera nije definisana u .env datoteci."
      );
    }

    // provera JWT tokena na udaljenom serveru
    // izvlačenje identifikatora korisnika iz JWT tokena
    const token = req.headers.authorization?.replace("Bearer ", "");
    const decodedToken = jwt.decode(token);
    if (decodedToken && decodedToken.sub) {
      req.user = { id: decodedToken.sub };
    }    
    const response = await axios.get(`${remoteUrl}/adm/tokens/check`, {
      headers: { Authorization: `Bearer ${token}` },
      timeout: 5000, // vreme za koje se očekuje odgovor od udaljenog servera (u milisekundama)
    });

    // provera statusa odgovora
    if (response.status === 200 && response.data.success) {
      // ako je JWT token ispravan, prelazimo na sledeći middleware
      next();
    } else {
      // ako nije ispravan, vraćamo poruku o grešci
      return res
        .status(401)
        .json({ message: "Niste autorizovani za pristup ovom resursu." });
    }
  } catch (error) {
    // u slučaju greške, vraćamo objekat sa informacijama o grešci
    return res.status(error.response?.status || 500).json({
      message: error.message || "Internal Server Error",
      data: error.response?.data || {},
    });
  }
};
