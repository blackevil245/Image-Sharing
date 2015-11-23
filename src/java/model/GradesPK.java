/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

/**
 *
 * @author black_000
 */
@Embeddable
public class GradesPK implements Serializable {
    @Basic(optional = false)
    @NotNull
    @Column(name = "ImageID")
    private int imageID;
    @Basic(optional = false)
    @NotNull
    @Column(name = "UserID")
    private int userID;
    @Basic(optional = false)
    @NotNull
    @Column(name = "OwnerID")
    private int ownerID;

    public GradesPK() {
    }

    public GradesPK(int imageID, int userID, int ownerID) {
        this.imageID = imageID;
        this.userID = userID;
        this.ownerID = ownerID;
    }

    public int getImageID() {
        return imageID;
    }

    public void setImageID(int imageID) {
        this.imageID = imageID;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public int getOwnerID() {
        return ownerID;
    }

    public void setOwnerID(int ownerID) {
        this.ownerID = ownerID;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) imageID;
        hash += (int) userID;
        hash += (int) ownerID;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof GradesPK)) {
            return false;
        }
        GradesPK other = (GradesPK) object;
        if (this.imageID != other.imageID) {
            return false;
        }
        if (this.userID != other.userID) {
            return false;
        }
        if (this.ownerID != other.ownerID) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "model.GradesPK[ imageID=" + imageID + ", userID=" + userID + ", ownerID=" + ownerID + " ]";
    }
    
}
