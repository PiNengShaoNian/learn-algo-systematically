import Comparable from '../../model/comparable'

class Student implements Comparable<Student> {
  constructor(private name: string) {}

  equals(that: Student) {
    return this.name === that.name
  }

  compareTo(that: Student) {
    if (this.equals(that)) return 0
    return this.name > that.name ? 1 : -1
  }
}

export default Student
