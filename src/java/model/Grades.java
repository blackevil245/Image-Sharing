/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

import java.io.Serializable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author black_000
 */
@Entity
@Table(name = "GRADES")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Grades.findAll", query = "SELECT g FROM Grades g"),
    @NamedQuery(name = "Grades.findByImageID", query = "SELECT g FROM Grades g WHERE g.gradesPK.imageID = :imageID"),
    @NamedQuery(name = "Grades.findByUserID", query = "SELECT g FROM Grades g WHERE g.gradesPK.userID = :userID"),
    @NamedQuery(name = "Grades.findByOwnerID", query = "SELECT g FROM Grades g WHERE g.gradesPK.ownerID = :ownerID")})
public class Grades implements Serializable {
    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected GradesPK gradesPK;

    public Grades() {
    }

    public Grades(GradesPK gradesPK) {
        this.gradesPK = gradesPK;
    }

    public Grades(int imageID, int userID, int ownerID) {
        this.gradesPK = new GradesPK(imageID, userID, ownerID);
    }

    public GradesPK getGradesPK() {
        return gradesPK;
    }

    public void setGradesPK(GradesPK gradesPK) {
        this.gradesPK = gradesPK;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (gradesPK != null ? gradesPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Grades)) {
            return false;
        }
        Grades other = (Grades) object;
        if ((this.gradesPK == null && other.gradesPK != null) || (this.gradesPK != null && !this.gradesPK.equals(other.gradesPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "model.Grades[ gradesPK=" + gradesPK + " ]";
    }
    
}
