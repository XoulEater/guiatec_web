// Teacher DAO that communicates with the database
import TeacherSchema from "../schemas/teacher.schema";
import Teacher from "../model/Teacher";

/**
 * Class that communicates with the database to perform CRUD operations
 */
export default class TeacherDAO {
  /**
   * Get all the teachers from the database
   * @returns a list with all the teachers
   */
  public static async getAllTeachers(): Promise<Teacher[]> {
    const teachers = await TeacherSchema.find().exec();
    return teachers.map((teacher) => new Teacher(teacher.toObject()));
  }

  /**
   * Get all the members from the database
   * @returns a list with all the members
   */
  public static async getAllMembers() {
    const membersData = await TeacherSchema.find({ isMember: true }).exec();
    return membersData.map((member) => new Teacher(member.toObject()));
  }

  /**
   * Add a teacher as a member
   * @param pCode code of the teacher
   */
  public static async addMember(pCode: string) {
    await TeacherSchema.findOneAndUpdate(
      { id: pCode },
      { isMember: true },
      { new: true }
    ).exec();
  }

  /**
   * Remove a teacher as a member
   * @param pCode code of the teacher
   */
  public static async removeMember(pCode: string) {
    await TeacherSchema.findOneAndUpdate(
      { id: pCode },
      { isMember: false, isLeader: false },
      { new: true }
    ).exec();
  }

  /**
   * Set a teacher as a coordinator
   * @param pCode code of the teacher
   * @param pCoordinator true if the teacher is a coordinator, false otherwise
   */
  public static async setCoordinator(pCode: string, pLeader: boolean) {
    await TeacherSchema.findOneAndUpdate(
      { id: pCode },
      { isLeader: pLeader },
      { new: true }
    ).exec();
  }

  /**
   * Get a teacher by its code
   * @param pCode code of the teacher
   * @returns the teacher with the given code
   */
  public static async getTeacherByCode(pCode: string): Promise<Teacher> {
    const teacher = await TeacherSchema.findOne({ id: pCode }).exec();
    return teacher ? new Teacher(teacher.toObject()) : null;
  }

  /**
   * Create a new teacher in the database
   * @param teacher the teacher to be created
   */
  public static async createTeacher(teacher: Teacher) {
    await TeacherSchema.create(teacher);
  }

  /**
   * Update a teacher in the database
   * @param pCode code of the teacher
   * @param teacher the teacher with the new information
   */
  public static async updateTeacher(pCode: string, teacher: Teacher) {
    await TeacherSchema.findOneAndUpdate({ id: pCode }, teacher, {
      new: true,
    }).exec();
  }

  /**
   * Delete a teacher from the database
   * @param pCode code of the teacher
   */
  public static async deleteTeacher(pCode: string) {
    await TeacherSchema.findOneAndDelete({
      id: pCode,
    }).exec();
  }

  /**
   * Get a all the teachers from a campus
   * @param campus campus of the teachers
   * @returns a list with all the teachers from the campus
   */
  public static async getTeachersByCampus(campus: string): Promise<Teacher[]> {
    const teachers = await TeacherSchema.find({
      id: { $regex: `^${campus}-` },
    }).exec();
    return teachers.map((teacher) => new Teacher(teacher.toObject()));
  }
}
