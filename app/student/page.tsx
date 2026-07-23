"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Home() {
  const [students, setStudents] = useState<any[]>([]);

  const week = "الأسبوع الأول - 18-6-2026";

  useEffect(() => {
    async function getStudents() {
      const snapshot = await getDocs(collection(db, "students"));

      const data = snapshot.docs
        .sort((a, b) => a.id.localeCompare(b.id))
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      setStudents(data);
    }

    getStudents();
  }, []);

  async function saveAttendance(
    studentId: string,
    status: string
  ) {
    await addDoc(collection(db, "attendance"), {
      week,
      studentId,
      status,
    });

    alert("تم تسجيل الحضور");
  }

  return (
    <main style={{ padding: "30px", direction: "rtl" }}>

      <h1>
        متابعة حضور مجلس إقراء رواية ورش عن نافع
      </h1>

      <h2>
        {week}
      </h2>

      <hr />

      {students.map((student) => (
        <div
          key={student.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "15px",
            margin: "10px 0",
          }}
        >

          <h3>{student.name}</h3>

          <button
            onClick={() =>
              saveAttendance(student.id, "حضرت")
            }
          >
            ✅ حضرت
          </button>

          <button
            style={{ marginRight: "10px" }}
            onClick={() =>
              saveAttendance(
                student.id,
                "اعتذر عن الحضور"
              )
            }
          >
            🌿 اعتذر عن الحضور
          </button>

        </div>
      ))}

    </main>
  );
}