"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import StudentCard from "@/components/StudentCard";

export default function Home() {
  const [students, setStudents] = useState<any[]>([]);
const [attendance, setAttendance] = useState<any[]>([]);
const [message, setMessage] = useState("");

  const week = "الأسبوع الأول - 18-6-2026";
async function loadData() {
  // قراءة الطالبات
  const studentsSnapshot = await getDocs(collection(db, "students"));

  const studentsData = studentsSnapshot.docs
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

  setStudents(studentsData);

  // قراءة الحضور
  const attendanceSnapshot = await getDocs(collection(db, "attendance"));

  const attendanceData = attendanceSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  setAttendance(attendanceData);
}
  useEffect(() => {
  loadData();
}, []);

  async function saveAttendance(studentId: string, status: string) {console.log(studentId, status);
  const attendanceRef = collection(db, "attendance");

  const q = query(
    attendanceRef,
    where("studentId", "==", studentId),
    where("week", "==", week)
  );

  const snapshot = await getDocs(q);

console.log("عدد السجلات:", snapshot.size);

if (!snapshot.empty) {
    const docRef = snapshot.docs[0].ref;

    await updateDoc(docRef, {
  status,
});

await loadData();

setMessage("✅ تم التسجيل بنجاح");
setTimeout(() => {
  setMessage("");
}, 2000);
  } else {
    await addDoc(attendanceRef, {
  week,
  studentId,
  status,
});

await loadData();

setMessage("✅ تم التسجيل بنجاح");

setTimeout(() => {
  setMessage("");
}, 2000);
  }
}
const attendanceMap = new Map<string, string>();

attendance.forEach((item: any) => {
  if (item.week === week) {
    attendanceMap.set(item.studentId, item.status);
  }
});
  return (
    <main style={{ padding: "30px", direction: "rtl" }}>
      <h1
  style={{
    textAlign: "center",
    color: "#1b5e20",
    marginBottom: "10px",
  }}
>
  منصة متابعة حضور
</h1>

<h2
  style={{
    textAlign: "center",
    marginTop: 0,
  }}
>
  مجلس إقراء رواية ورش عن نافع
</h2>

<p
  style={{
    textAlign: "center",
    color: "#666",
  }}
>
  {week}
</p>
{message && (
  <div
    style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#2e7d32",
      color: "white",
      padding: "20px 35px",
      borderRadius: "12px",
      fontSize: "20px",
      fontWeight: "bold",
      boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
      zIndex: 9999,
      textAlign: "center",
    }}
  >
    {message}
  </div>
)}
      <hr />

      {students.map((student) => (
  <StudentCard
    key={student.id}
    name={student.name}
    status={attendanceMap.get(student.id) ?? ""}
    onPresent={() =>
      saveAttendance(student.id, "حضرت")
    }
    onAbsent={() =>
      saveAttendance(student.id, "اعتذر عن الحضور")
    }
  />
))}
    </main>
  );
}