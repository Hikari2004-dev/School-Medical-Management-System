package com.school_medical.school_medical_management_system.repositories.impl;

import com.school_medical.school_medical_management_system.repositories.IMedicalSupplyRepository;
import com.school_medical.school_medical_management_system.repositories.entites.MedicalSupply;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class MedicalSupplyRepository implements IMedicalSupplyRepository {

    @Autowired
    private DataSource dataSource;

    @Override
    public void createSupply(MedicalSupply supply) {
        String sql = "INSERT INTO medicalsupply (name, quantity, description, last_checked_date) VALUES (?, ?, ?, ?)";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, supply.getName());
            stmt.setInt(2, supply.getQuantity());
            stmt.setString(3, supply.getDescription());
            stmt.setDate(4, supply.getLastCheckedDate() != null ? new java.sql.Date(supply.getLastCheckedDate().getTime()) : null);

            stmt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Error creating supply", e);
        }
    }

    @Override
    public List<MedicalSupply> getAllSupplies() {
        List<MedicalSupply> supplies = new ArrayList<>();
        String sql = "SELECT * FROM medicalsupply";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                MedicalSupply supply = new MedicalSupply();
                supply.setSupplyId(rs.getInt("supply_id"));
                supply.setName(rs.getString("name"));
                supply.setQuantity(rs.getInt("quantity"));
                supply.setDescription(rs.getString("description"));
                supply.setLastCheckedDate(rs.getDate("last_checked_date"));
                supplies.add(supply);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error retrieving supplies", e);
        }
        return supplies;
    }

    @Override
    public MedicalSupply findById(Integer id) {
        String sql = "SELECT * FROM medicalsupply WHERE supply_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    MedicalSupply supply = new MedicalSupply();
                    supply.setSupplyId(rs.getInt("supply_id"));
                    supply.setName(rs.getString("name"));
                    supply.setQuantity(rs.getInt("quantity"));
                    supply.setDescription(rs.getString("description"));
                    supply.setLastCheckedDate(rs.getDate("last_checked_date"));
                    return supply;
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error finding supply by ID", e);
        }
        return null;
    }

    @Override
    public void updateSupply(MedicalSupply supply) {
        String sql = "UPDATE medicalsupply SET name = ?, quantity = ?, description = ?, last_checked_date = ? WHERE supply_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, supply.getName());
            stmt.setInt(2, supply.getQuantity());
            stmt.setString(3, supply.getDescription());
            stmt.setDate(4, supply.getLastCheckedDate() != null ? new java.sql.Date(supply.getLastCheckedDate().getTime()) : null);
            stmt.setInt(5, supply.getSupplyId());

            stmt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Error updating supply", e);
        }
    }

    @Override
    public void deleteSupply(Integer id) {
        String sql = "DELETE FROM medicalsupply WHERE supply_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            stmt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Error deleting supply", e);
        }
    }
}
